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

import client.inventory.IItem;
import java.util.List;

import client.inventory.MaplePet;
import client.MapleStat;
import client.MapleCharacter;
import handling.MaplePacket;
import handling.SendPacketOpcode;
import server.movement.LifeMovementFragment;
import tools.MaplePacketCreator;
import tools.data.output.MaplePacketLittleEndianWriter;

public class PetPacket {

    private final static byte[] ITEM_MAGIC = new byte[]{(byte) 0x80, 5};

    public static final MaplePacket updatePet(final MaplePet pet, final IItem item) {
        final MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.MODIFY_INVENTORY_ITEM.getValue());
        mplew.write(0);
        mplew.write(2);
        mplew.write(3);
        mplew.write(5);
        mplew.writeShort(pet.getInventoryPosition());
        mplew.write(0);
        mplew.write(5);
        mplew.writeShort(pet.getInventoryPosition());
        mplew.write(3);
        mplew.writeInt(pet.getPetItemId());
        mplew.write(1);
        mplew.writeLong(pet.getUniqueId());
        PacketHelper.addPetItemInfo(mplew, item, pet);
        return mplew.getPacket();
    }
	
	public static MaplePacket PetComplete(MapleCharacter chr, MaplePet pet) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.COMPLETE_PET.getValue());
        mplew.writeInt(chr.getId());
        mplew.write(chr.getPetIndex(pet));
        mplew.writeLong(pet.getUniqueId());
		mplew.write(0);
        mplew.writeInt(0);
		
        return mplew.getPacket();
    }

    public static final MaplePacket removePet(final MapleCharacter chr, final int slot) {
        final MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.SPAWN_PET.getValue());
        mplew.writeInt(chr.getId());
        mplew.writeShort(slot);
        return mplew.getPacket();
    }

    public static final MaplePacket showPet(final MapleCharacter chr, final MaplePet pet, final boolean remove, final boolean hunger) {
        final MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.SPAWN_PET.getValue());
        mplew.writeInt(chr.getId());
        mplew.write(chr.getPetIndex(pet));

        if (remove) {
            mplew.write(0);
            mplew.write(hunger ? 1 : 0);
        } else {
            mplew.write(1);
            mplew.write(0); //1?
            mplew.writeInt(pet.getPetItemId());
            mplew.writeMapleAsciiString(pet.getName());
            mplew.writeLong(pet.getUniqueId());
            mplew.writeShort(pet.getPos().x);
            mplew.writeShort(pet.getPos().y - 20);
            mplew.write(pet.getStance());
            mplew.writeInt(pet.getFh());
			mplew.writeInt(0);
        }
        return mplew.getPacket();
    }

    public static final MaplePacket removePet(final int cid, final int index) {
        final MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.SPAWN_PET.getValue());
        mplew.writeInt(cid);
        mplew.write(index);
        mplew.writeShort(0);
        return mplew.getPacket();
    }

    public static final MaplePacket movePet(final int cid, final int pid, final byte slot, final List<LifeMovementFragment> moves) {
        final MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.MOVE_PET.getValue());
        mplew.writeInt(cid);
        mplew.write(slot);
        mplew.writeLong(pid);
        PacketHelper.serializeMovementList(mplew, moves);

        return mplew.getPacket();
    }

    public static final MaplePacket petChat(final int cid, final int un, final String text, final byte slot) {
        final MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.PET_CHAT.getValue());
        mplew.writeInt(cid);
        mplew.write(slot);
        mplew.writeShort(un);
        mplew.writeMapleAsciiString(text);
        mplew.write(0); //hasQuoteRing

        return mplew.getPacket();
    }

    public static final MaplePacket commandResponse(final int cid, final byte command, final byte slot, final boolean success, final boolean food) {
        final MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.PET_COMMAND.getValue());
        mplew.writeInt(cid);
        mplew.write(slot);
        mplew.write(command == 1 ? 1 : 0);
        mplew.write(command);
        if (command == 1) {
            mplew.write(0);

        } else {
            mplew.writeShort(success ? 1 : 0);
        }
        return mplew.getPacket();
    }

    public static final MaplePacket showOwnPetLevelUp(final byte index) {
        final MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.SHOW_ITEM_GAIN_INCHAT.getValue());
        mplew.write(4);
        mplew.write(0);
        mplew.write(index); // Pet Index

        return mplew.getPacket();
    }

    public static final MaplePacket showPetLevelUp(final MapleCharacter chr, final byte index) {
        final MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.SHOW_FOREIGN_EFFECT.getValue());
        mplew.writeInt(chr.getId());
        mplew.write(4);
        mplew.write(0);
        mplew.write(index);

        return mplew.getPacket();
    }

    public static final MaplePacket emptyStatUpdate() {
        return MaplePacketCreator.enableActions();
    }

    public static final MaplePacket petStatUpdate_Empty() {
        final MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.UPDATE_STATS.getValue());
        mplew.write(0);
        mplew.writeLong(MapleStat.PET.getValue());
        mplew.writeZeroBytes(25);
        return mplew.getPacket();
    }

    public static final MaplePacket petStatUpdate(final MapleCharacter chr) {
        final MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.UPDATE_STATS.getValue());
        mplew.write(0);
        mplew.writeLong(MapleStat.PET.getValue());

        byte count = 0;
        for (final MaplePet pet : chr.getPets()) {
            if (pet.getSummoned()) {
                mplew.writeLong(pet.getUniqueId());
                count++;
            }
        }
        while (count < 3) {
            mplew.writeZeroBytes(8);
            count++;
        }
        mplew.write(0);
		mplew.writeShort(0);

        return mplew.getPacket();
    }
}
