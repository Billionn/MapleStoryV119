using System;
using System.Collections.Generic;
using System.Windows.Forms;
using System.Net;
using System.IO;
using System.Security.Cryptography;
using System.Net.NetworkInformation;
using System.Diagnostics;

namespace Hawt
{
    static class Program
    {
        public static frmMain form;
        //改成你的IP
        public static string toIP = "35.187.217.81";
        public static bool resolveDNS = false;
        public static bool useGui = false;
        public static string regURL = "";
        public static string accountCheck = "http://127.0.0.1/AccountCheck.php"; 
        public static MapleMode Mode = MapleMode.GMS;
        public static string username = "";
        public static string password = "";
        public static ushort lowPort = 13001;
        public static ushort highPort = 13020;

        public static bool DevMode = false;

        /// <summary>
        /// The main entry point for the application.
        /// </summary>
        [STAThread]
        static void Main()
        {
            if (isrunning())
            {
                Environment.Exit(0);
                return;
            }
            if (resolveDNS) getIP();
             string[] launchaprams =  Environment.GetCommandLineArgs();
             if (launchaprams.Length > 1)
             {
                 switch (launchaprams[1])
                 {
                     case "fix":
                         return;
                     case "dev_sec":
                         DevMode = true;
                         break;
                 }
             }
            Application.EnableVisualStyles();
            Application.SetCompatibleTextRenderingDefault(false);
            form = new frmMain();
            if (useGui || Mode == MapleMode.GMS)
            {
                Application.Run(form);
            }
            else
            {
                Application.Run();
            }
        }

        public static void OnRelaunch()
        {
            string currentDirectory = Directory.GetCurrentDirectory();
            if (!File.Exists(currentDirectory + "/Maplestory.exe"))
            {
                MessageBox.Show("Please place this file in your Maplestory v142 folder.");
                Application.Exit();
            }
           Process Maple = new Process();
           Maple.StartInfo.FileName = Path.Combine(currentDirectory, "Maplestory.exe");
           if (Mode == MapleMode.GMS)
                Maple.StartInfo.Arguments = "GameLaunching";
            Maple.Start();
        }

        public static bool isrunning()
        {
            string procName = System.Diagnostics.Process.GetCurrentProcess().ProcessName;
            return System.Diagnostics.Process.GetProcessesByName(procName).Length > 1;
        }


        public static string HashString(string input)
        {
            System.Security.Cryptography.MD5CryptoServiceProvider x = new System.Security.Cryptography.MD5CryptoServiceProvider();
            byte[] data = System.Text.Encoding.ASCII.GetBytes(input);
            string lulz = "";
            foreach (byte xy in data) lulz += xy.ToString("X2");
            return lulz;
        }


        public static void getIP()
        {
            IPHostEntry entry = Dns.GetHostEntry(toIP);
            if (entry.AddressList.Length > 0)
                toIP = entry.AddressList[0].ToString();
        }
    }
}
