/*
 This file is part of the OdinMS Maple Story Server
 Copyright (C) 2008 ~ 2010 Patrick Huy <patrick.huy@frz.cc> 
 Matthias Butz <matze@odinms.de>
 Jan Christian Meyer <vimes@odinms.de>

 This program is free software: you can redistribute it and/or modify
 it under the terms of the GNU Affero General Public License version 3
 as published by the Free Software Foundation. You may not use, modify
 or distribute this program under any other version of the
 GNU Affero General Public License.

 This program is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU Affero General Public License for more details.

 You should have received a copy of the GNU Affero General Public License
 along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
package tools.packet;

import java.util.List;
import java.util.Map;
import java.util.Set;

import client.MapleClient;
import client.MapleCharacter;
import constants.ServerConstants;
import constants.GameConstants;
import handling.MaplePacket;
import handling.SendPacketOpcode;
import handling.login.LoginServer;
import tools.data.output.MaplePacketLittleEndianWriter;
import tools.HexTool;
import server.Randomizer;

public class LoginPacket {

    public static final MaplePacket getHello(final short mapleVersion, final byte[] sendIv, final byte[] recvIv) {
        final MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter(16);

        mplew.writeShort(14); // 13 = MSEA, 14 = GlobalMS, 15 = EMS
        mplew.writeShort(mapleVersion);
        mplew.writeMapleAsciiString(ServerConstants.MAPLE_PATCH);
        mplew.write(recvIv);
        mplew.write(sendIv);
        mplew.write(6); // 7 = MSEA, 8 = GlobalMS, 5 = Test Server

        return mplew.getPacket();
    }

    public static final MaplePacket getPing() {
        final MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter(16);

        mplew.writeShort(SendPacketOpcode.PING.getValue());

        return mplew.getPacket();
    }
    public static final MaplePacket getLoginAUTH() {

        final MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter(13);
		
        mplew.writeShort(SendPacketOpcode.LOGIN_AUTH.getValue());
        final int rand = Randomizer.nextInt(2);
        mplew.writeMapleAsciiString("MapLogin" + (rand == 0 ? "" : String.valueOf(rand)));
        mplew.writeInt(GameConstants.getCurrentDate());

        return mplew.getPacket();
    }

    public static final MaplePacket StrangeDATA() {
        final MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter(16);

        mplew.writeShort(0x12);
        // long string = generated static public key
        mplew.writeMapleAsciiString("30819F300D06092A864886F70D010101050003818D0030818902818100994F4E66B003A7843C944E67BE4375203DAA203C676908E59839C9BADE95F53E848AAFE61DB9C09E80F48675CA2696F4E897B7F18CCB6398D221C4EC5823D11CA1FB9764A78F84711B8B6FCA9F01B171A51EC66C02CDA9308887CEE8E59C4FF0B146BF71F697EB11EDCEBFCE02FB0101A7076A3FEB64F6F6022C8417EB6B87270203010001");
        //mplew.writeMapleAsciiString("30819D300D06092A864886F70D010101050003818B00308187028181009E68DD55B554E5924BA42CCB2760C30236B66234AFAA420E8E300E74F1FDF27CD22B7FF323C324E714E143D71780C1982E6453AD87749F33E540DB44E9F8C627E6898F915587CD2A7D268471E002D30DF2E214E2774B4D3C58609155A7C79E517CEA332AF96C0161BFF6EDCF1CB44BA21392BED48CBF4BD1622517C6EA788D8D020111");

        return mplew.getPacket();
    }

    public static final MaplePacket getLoginFailed(final int reason) {
        final MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter(16);

        /*	* 3: ID deleted or blocked
         * 4: Incorrect password
         * 5: Not a registered id
         * 6: System error
         * 7: Already logged in
         * 8: System error
         * 9: System error
         * 10: Cannot process so many connections
         * 11: Only users older than 20 can use this channel
         * 13: Unable to log on as master at this ip
         * 14: Wrong gateway or personal info and weird korean button
         * 15: Processing request with that korean button!
         * 16: Please verify your account through email...
         * 17: Wrong gateway or personal info
         * 21: Please verify your account through email...
         * 23: License agreement
         * 25: Maple Europe notice
         * 27: Some weird full client notice, probably for trial versions
         * 32: IP blocked
         * 84: please revisit website for pass change --> 0x07 recv with response 00/01*/
        mplew.writeShort(SendPacketOpcode.LOGIN_STATUS.getValue());
        mplew.write(reason);
        mplew.writeShort(0);

        return mplew.getPacket();
    }

    public static final MaplePacket getPermBan(final byte reason) {
        final MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter(16);

        mplew.writeShort(SendPacketOpcode.LOGIN_STATUS.getValue());
        mplew.writeShort(2); // Account is banned
        mplew.write(0);
        mplew.write(reason);
        mplew.write(HexTool.getByteArrayFromHexString("01 01 01 01 00"));

        return mplew.getPacket();
    }

    public static final MaplePacket getTempBan(final long timestampTill, final byte reason) {
        final MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter(17);

        mplew.writeShort(SendPacketOpcode.LOGIN_STATUS.getValue());
        mplew.write(2);
        mplew.write(HexTool.getByteArrayFromHexString("00 00 00 00 00"));
        mplew.write(reason);
        mplew.writeLong(timestampTill); // Tempban date is handled as a 64-bit long, number of 100NS intervals since 1/1/1601. Lulz.

        return mplew.getPacket();
    }

    public static final MaplePacket getGenderChanged(final MapleClient client) {
        final MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.GENDER_SET.getValue());
        mplew.writeMapleAsciiString(client.getAccountName());

        return mplew.getPacket();
    }

    public static final MaplePacket getGenderNeeded(final MapleClient client) {
        final MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.CHOOSE_GENDER.getValue());
        mplew.writeMapleAsciiString(client.getAccountName());

        return mplew.getPacket();
    }

    public static final MaplePacket getAuthSuccessRequest(final MapleClient client) {
        final MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.LOGIN_STATUS.getValue());
        mplew.write(0);
        mplew.writeInt(client.getAccID());
        mplew.write(client.getGender());
        mplew.writeShort(client.isGm() ? 1 : 0); // Admin byte
        mplew.writeInt(0);
        mplew.writeMapleAsciiString(client.getAccountName());
        mplew.writeLong(0);
        mplew.writeLong(0);
        mplew.writeLong(0);

        return mplew.getPacket();
    }

    public static final MaplePacket deleteCharResponse(final int cid, final int state) {
        final MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.DELETE_CHAR_RESPONSE.getValue());
        mplew.writeInt(cid);
        mplew.write(state);

        return mplew.getPacket();
    }

    public static final MaplePacket secondPwError(final byte mode) {
        final MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter(3);

        /*
         * 14 - Invalid password
         * 15 - Second password is incorrect
         */
        mplew.writeShort(SendPacketOpcode.SECONDPW_ERROR.getValue());
        mplew.write(mode);

        return mplew.getPacket();
    }

    public static final MaplePacket getServerList(final int serverId, final String serverName, final Map<Integer, Integer> channelLoad) {
        final MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.SERVERLIST.getValue());
        mplew.write(serverId); // 0 = Aquilla, 1 = bootes, 2 = cass, 3 = delphinus
        mplew.writeMapleAsciiString(serverName);
        mplew.write(LoginServer.getFlag());
        mplew.writeMapleAsciiString(LoginServer.getEventMessage());
        mplew.writeShort(100);
        mplew.writeShort(100);

        int lastChannel = 1;
        Set<Integer> channels = channelLoad.keySet();
        for (int i = 30; i > 0; i--) {
            if (channels.contains(i)) {
                lastChannel = i;
                break;
            }
        }
        mplew.write(lastChannel);

        int load;
        for (int i = 1; i <= lastChannel; i++) {
            if (channels.contains(i)) {
                load = channelLoad.get(i);
            } else {
                load = 1200;
            }
            mplew.writeMapleAsciiString(serverName + "-" + i);
            mplew.writeInt(load);
            mplew.write(serverId);
            mplew.writeShort(i - 1);
        }
        String[] bubbleMsg = LoginServer.getBubbleMessage().split(",");
        String[] bubbleMsgPos = LoginServer.getBubbleMessagePos().split(",");
		
        mplew.writeShort(bubbleMsg.length);
		
		for( int i = 0 ; i < bubbleMsg.length ; ++i ){
			String[] Pos = bubbleMsgPos[i].split("\\.");
			
			mplew.writeShort(Integer.parseInt(Pos[0]));
			mplew.writeShort(Integer.parseInt(Pos[1]));
			
			mplew.writeMapleAsciiString(bubbleMsg[i]);
		}

        return mplew.getPacket();
    }

    public static final MaplePacket getEndOfServerList() {
        final MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.SERVERLIST.getValue());
        mplew.write(0xFF);

        return mplew.getPacket();
    }

    public static final MaplePacket getServerStatus(final int status) {
        final MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        /*	 * 0 - Normal
         * 1 - Highly populated
         * 2 - Full*/
        mplew.writeShort(SendPacketOpcode.SERVERSTATUS.getValue());
        mplew.writeShort(status);

        return mplew.getPacket();
    }

    public static final MaplePacket getCharList(final boolean secondpw, final List<MapleCharacter> chars, int charslots) {
        final MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.CHARLIST.getValue());
        mplew.write(0);
        mplew.writeInt(1000000); // 40 42 0F 00
        mplew.write(chars.size()); // 1

        for (final MapleCharacter chr : chars) {
            addCharEntry(mplew, chr, !chr.isGM() && chr.getLevel() >= 10);
        }
        mplew.writeShort(3); // second pw request
        mplew.writeLong(charslots);
		mplew.writeInt(0);
		mplew.writeLong(-Randomizer.nextLong());

        return mplew.getPacket();
    }

    public static final MaplePacket addNewCharEntry(final MapleCharacter chr, final boolean worked) {
        final MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.ADD_NEW_CHAR_ENTRY.getValue());
        mplew.write(worked ? 0 : 1);
        addCharEntry(mplew, chr, false);

        return mplew.getPacket();
    }

    public static final MaplePacket charNameResponse(final String charname, final boolean nameUsed) {
        final MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.CHAR_NAME_RESPONSE.getValue());
        mplew.writeMapleAsciiString(charname);
        mplew.write(nameUsed ? 1 : 0);

        return mplew.getPacket();
    }

    private static final void addCharEntry(final MaplePacketLittleEndianWriter mplew, final MapleCharacter chr, boolean ranking) {
        PacketHelper.addCharStats(mplew, chr);
        PacketHelper.addCharLook(mplew, chr, true);
        mplew.write(0); //<-- who knows
        mplew.write(ranking ? 1 : 0);
        if (ranking) {
            mplew.writeInt(chr.getRank());
            mplew.writeInt(chr.getRankMove());
            mplew.writeInt(chr.getJobRank());
            mplew.writeInt(chr.getJobRankMove());
        }
    }
}
