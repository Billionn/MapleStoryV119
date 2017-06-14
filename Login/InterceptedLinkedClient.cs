using System;
using System.Diagnostics;
using System.Net.Sockets;
using System.Threading;
using MapleLib.MapleCryptoLib;
using MapleLib.PacketLib;
using System.IO;

namespace Hawt
{
    public sealed class InterceptedLinkedClient
    {
        Session inSession;
        Session outSession;

        bool gotEnc = false;
        ushort Port;
        bool connected = true;
        bool block = false;
        int charID = -1;
        MapleMode Mode;

        public InterceptedLinkedClient(Session inside, string toIP, ushort toPort)
        {
            this.Mode = Program.Mode;
            this.Port = toPort;
            Debug.WriteLine("New linkclient to " + toIP);
            inSession = inside;
            inside.OnPacketReceived += new Session.PacketReceivedHandler(inside_OnPacketReceived);
            inside.OnClientDisconnected += new Session.ClientDisconnectedHandler(inside_OnClientDisconnected);
            ConnectOut(toIP, toPort);

            Debug.WriteLine("Connecting out to port " + toPort);
        }

        void inside_OnClientDisconnected(Session session)
        {
            if(outSession != null)
            outSession.Socket.Shutdown(SocketShutdown.Both);
            connected = false;
        }

        void ConnectOut(string ip, int port)
        {
            try
            {
                Socket outSocket = new Socket(AddressFamily.InterNetwork, SocketType.Stream, ProtocolType.Tcp);
                outSocket.BeginConnect(ip, port, new AsyncCallback(OnOutConnectCallback), outSocket);
            }
            catch { outSession_OnClientDisconnected(null); }
        }

        private void OnOutConnectCallback(IAsyncResult ar)
        {
            Socket sock = (Socket)ar.AsyncState;
            try
            {
                sock.EndConnect(ar);
            }
            catch
            {
                connected = false;
                inSession.Socket.Shutdown(SocketShutdown.Both);
                return;
            }

            if (outSession != null)
            {
                outSession.Socket.Close();
                outSession.Connected = false;
            }
            Session session = new Session(sock, SessionType.CLIENT_TO_SERVER);
            outSession = session;

            outSession.OnInitPacketReceived += new Session.InitPacketReceived(outSession_OnInitPacketReceived);
            outSession.OnPacketReceived += new Session.PacketReceivedHandler(outSession_OnPacketReceived);
            outSession.OnClientDisconnected += new Session.ClientDisconnectedHandler(outSession_OnClientDisconnected);
            session.WaitForDataNoEncryption();
        }

        private volatile Mutex mutex = new Mutex();

        void inside_OnPacketReceived(byte[] packet)
        {
            if (!connected || block)
            {
                return;
            }
            mutex.WaitOne();
            try
            {
                short opcode = BitConverter.ToInt16(packet, 0);
                switch (Mode)
                {
                    case MapleMode.GMS:
                        /*
                        switch (opcode)
                        {
                            case 0x27:
                                charID = BitConverter.ToInt32(packet, 2);
                                break;
                            case 0x38:
                                SendLoginData();
                                break;
                        }*/
                        break;
                    default:
                        Debug.WriteLine("Write handlers for EMS please.");
                        break;
                }
                //Console.WriteLine("inside_OnPacketReceived = " + BitConverter.ToString(packet));
                DateTime Date = DateTime.Now;
                string TodyTime = Date.ToString("yyyy-MM-dd HH:mm:ss");
                StreamWriter sw = new StreamWriter(System.Environment.CurrentDirectory+"/客戶端發出.txt", true);
                sw.WriteLine("["+ TodyTime + "]\r\n"  +  BitConverter.ToString(packet).Replace("-", " "));
                sw.Close();
                outSession.SendPacket(packet);
            }
            finally
            {
                mutex.ReleaseMutex();
            }
        }

        void outSession_OnClientDisconnected(Session session)
        {
            if (block){ // simply changing channels, shouldn't happen though
                return;
            }
            inSession.Socket.Shutdown(SocketShutdown.Both);
            Debug.WriteLine("out disconnected (" + Port + ")");
            connected = false;
        }

        private volatile Mutex mutex2 = new Mutex();

        void outSession_OnPacketReceived(byte[] packet)
        {
            if (!gotEnc || !connected)
            {
                return;
            }
            mutex2.WaitOne();
            try
            {
                short opcode = BitConverter.ToInt16(packet, 0);
                Debug.WriteLine("Got a packet from server: " + opcode);
                switch (Mode)
                {
                    case MapleMode.GMS:
                        if (opcode == 0x04 || opcode == 0x08)
                        {
                            int b = 0;
                            block = true;
                            if (opcode == 0x08) b = 1;
                            //short newPort = BitConverter.ToInt16(packet, 7);
                            //ConnectOut(Program.toIP, newPort);
                            packet[4-b] = 210;
                            packet[5-b] = 201;
                            packet[6-b] = 89;
                            packet[7-b] = 191;
                            //return;
                        }
                        if (opcode >= 378 || opcode<=388 )//CS_OPERATION
                        {
                            DateTime _Date = DateTime.Now;
                            string _TodyTime = _Date.ToString("yyyy-MM-dd HH:mm:ss");
                            StreamWriter _sw = new StreamWriter(System.Environment.CurrentDirectory+"/商城封包.txt", true);
                            _sw.WriteLine("[" + _TodyTime + "]\r\n" + BitConverter.ToString(packet).Replace("-", " "));
                            _sw.Close();
                        }
                        break;

                    default:
                        break;
                }
                DateTime Date = DateTime.Now;
                string TodyTime = Date.ToString("yyyy-MM-dd HH:mm:ss");
                StreamWriter sw = new StreamWriter(System.Environment.CurrentDirectory+"/客戶端接收.txt", true);
                sw.WriteLine("[" + TodyTime + "]\r\n" + BitConverter.ToString(packet).Replace("-", " "));
                sw.Close();
                inSession.SendPacket(packet);
            }
            finally
            {
                mutex2.ReleaseMutex();
            }
        }

        void outSession_OnInitPacketReceived(short version, byte serverIdentifier)
        {
            Debug.WriteLine("Init packet: v" + version + " ident: " + serverIdentifier);
            if (block)
            {
                connected = true;
                ChannelCompleteLogin();
                return;
            }
            SendHandShake(version, serverIdentifier);
        }

        void ChannelCompleteLogin()
        {
            PacketWriter writer = new PacketWriter();
            if (Program.Mode == MapleMode.MSEA)
            {
                writer.WriteShort(0x27); 
            }
            else
            {
                writer.WriteShort(0x27);
            }
            writer.WriteInt(charID);

            outSession.SendPacket(writer.ToArray());
            block = false;
            Debug.WriteLine("change channel complete.");
        }

        private void SendHandShake(short version, byte serverident)
        {
            PacketWriter writer = new PacketWriter();
            writer.WriteShort(14);
            writer.WriteShort(version);
            writer.WriteMapleString("1");
            byte[] riv = new byte[4];
            byte[] siv = new byte[4];
            Random lulz = new Random();
            lulz.NextBytes(riv);
            lulz.NextBytes(siv);
            inSession.RIV = new MapleCrypto(riv, version);
            inSession.SIV = new MapleCrypto(siv, version);
            writer.WriteBytes(riv);
            writer.WriteBytes(siv);
            writer.WriteByte(serverident);
            gotEnc = true;
            inSession.SendRawPacket(writer.ToArray());
        }

        void SendLoginData()
        {
            PacketWriter writer = new PacketWriter();
            writer.WriteShort(0x01);
            writer.WriteMapleString(Program.username);
            writer.WriteMapleString(Program.password);
            writer.WriteMapleString(Environment.OSVersion.VersionString);
            outSession.SendPacket(writer.ToArray());
        }
    }
}
