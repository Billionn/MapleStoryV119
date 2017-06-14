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
package handling.channel.handler;

import java.awt.Point;
import java.util.ArrayList;
import java.util.List;

import server.maps.AnimatedMapleMapObject;
import server.movement.*;
import tools.data.input.SeekableLittleEndianAccessor;
import tools.data.input.LittleEndianAccessor;

public class MovementParse {

    //1 = player, 2 = mob, 3 = pet, 4 = summon, 5 = dragon
    public static final List<LifeMovementFragment> parseMovement(final SeekableLittleEndianAccessor lea, int kind) {
        final List<LifeMovementFragment> res = new ArrayList<LifeMovementFragment>();
        final byte numCommands = lea.readByte();

        for (byte i = 0; i < numCommands; i++) {
            final byte command = lea.readByte();

            //System.out.println("command = " + command );
            switch (command) {
                case 0: // normal move
                case 5:
				case 15: // Jump Down
				case 0xE: // Float
				case 0x23:
				case 0x24:
                {
                    final short xpos = lea.readShort();
                    final short ypos = lea.readShort();
                    final short xwobble = lea.readShort();
                    final short ywobble = lea.readShort();
                    final short unk = lea.readShort();
					short fh = 0;
					if( command == 15 ){
						fh = lea.readShort();
					}
					final short xoffset = lea.readShort();
                    final short yoffset = lea.readShort();
                    final byte newstate = lea.readByte();
                    final short duration = lea.readShort();
                    final StaticLifeMovement mov = new StaticLifeMovement(command, new Point(xpos, ypos), duration, newstate, unk);
                    mov.setUnk(unk);
                    mov.setFh(fh);
                    mov.setPixelsPerSecond(new Point(xwobble, ywobble));
					mov.setOffset(new Point(xoffset, yoffset));
                    res.add(mov);
                    break;
                }
                case 1:
                case 2:
				case 0xD:
				case 0x10:
				case 0x12:
				case 0x1F:
				case 0x20:
				case 0x21:
				case 0x22:{
                    final short xwobble = lea.readShort();
                    final short ywobble = lea.readShort();
                    final byte newstate = lea.readByte();
                    final short duration = lea.readShort();
                    final StaticLifeMovement mov = new StaticLifeMovement(command, new Point(xwobble, ywobble), duration, newstate, 0);
                    mov.setPixelsPerSecond(new Point(xwobble, ywobble));
                    res.add(mov);
                    break;
                }
                case 3:
                case 4: // tele... -.-
				case 6:
                case 7: // assaulter
                case 8: // assassinate
				case 11:{ 
					final short xpos = lea.readShort();
					final short ypos = lea.readShort();
					final short fh = lea.readShort();
					final byte newstate = lea.readByte();
					final short duration = lea.readShort();
					final StaticLifeMovement mov = new StaticLifeMovement(command, new Point(xpos, ypos), duration, newstate, 0);
					mov.setFh(fh);
					res.add(mov);
                    break;
                }
				case 12:
                {
                    final short xpos = lea.readShort();
                    final short ypos = lea.readShort();
                    final short unk = lea.readShort();
                    final byte newstate = lea.readByte();
                    final short duration = lea.readShort();
                    final StaticLifeMovement mov = new StaticLifeMovement(command, new Point(xpos, ypos), duration, newstate, 0);
                    mov.setUnk(unk);
                    res.add(mov);
                    break;
                }
                case 0x11:{ // Soaring?
                    final short xpos = lea.readShort();
                    final short ypos = lea.readShort();
                    final short unk = lea.readShort();
                    final short fh = lea.readShort();
                    final byte newstate = lea.readByte();
                    final short duration = lea.readShort();
                    final StaticLifeMovement mov = new StaticLifeMovement(command, new Point(xpos, ypos), duration, newstate, 0);
                    mov.setUnk(unk);
                    mov.setFh(fh);
                    res.add(mov);
                    break;
                }
                case 10:{ // change equip ???
                    final int wui = lea.readByte();
                    final StaticLifeMovement mov = new StaticLifeMovement(command, null, 0, 0, 0);
                    mov.setWui(wui);
                    res.add(mov);
                    break;
                }
                case 20:
				case 21:
				case 22:
				case 23:
				case 24:
				case 25:
				case 26:
				case 27:
				case 28:
				case 29:
				case 30:
				default:{
                    final byte newstate = lea.readByte();
                    final short duration = lea.readShort();
                    final StaticLifeMovement mov = new StaticLifeMovement(command, null , duration, newstate,0);	
                    res.add(mov);
                    break;
                }
            }
        }
        if (numCommands != res.size()) {
            System.out.println("error in movement");
            return null; // Probably hack
        }
        return res;
    }

    public static final void updatePosition(final List<LifeMovementFragment> movement, final AnimatedMapleMapObject target, final int yoffset) {
        for (final LifeMovementFragment move : movement) {
            if (move instanceof LifeMovement) {
                if (move instanceof StaticLifeMovement) {
                    Point position = ((StaticLifeMovement) move).getPosition();
                    if (position != null){
                        position.y += yoffset;
                        target.setPosition(position);
                    }
                }
                target.setStance(((StaticLifeMovement) move).getNewstate());
            }
        }
    }
}