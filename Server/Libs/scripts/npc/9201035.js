var status = -1;

function action(mode, type, selection) {
    if (mode == 1) {
	status++;
    } else {
	cm.dispose();
	return;
    }
    if (status == 0) {
	    cm.sendSimple("���n�ƻ����U��?\r\n#b#L0#�ڷQ���B#l\r\n#L1#�ڷQ�洫�ڪ����B�٫�.#l#k");
    } else if (status == 1) {
		if (selection == 0) {
			if(cm.getPlayer().getMarriageId() > 0){
				cm.sendYesNo("�A�T�w��!?�@���M�w�F�N�L�k���^�F");
			}else{
				cm.sendOk("�A�S�����B");
				cm.dispose();
			}
		} else {
			var dat = parseInt(cm.getQuestRecord(160001).getCustomData());
			if (dat >= 2) {
				var selStr = "�A�Q�n�洫���ӧ٫�...";
				var found = false;
				for (var i = 1112300; i < 1112312; i++) {
					if (cm.haveItem(i)) {
						found = true;
						selStr += "\r\n#L" + i + "##v" + i + "##t" + i + "##l";
					}
				}
				for (var i = 4210000; i < 4210012; i++) {
					if (cm.haveItem(i)) {
						found = true;
						selStr += "\r\n#L" + i + "##v" + i + "##t" + i + "##l";
					}
				}
				if (!found) {
					cm.sendOk("�A�S������٫�.");
					cm.dispose();
				} else {
					cm.sendSimple(selStr);
				}
			}else{
					cm.sendOk("�A�������������B����.");
					cm.dispose();				
			}
	    }
    } else if (status == 2) {
		if (selection == -1) {
			var cPlayer = cm.getClient().getChannelServer().getPlayerStorage().getCharacterById(cm.getPlayer().getMarriageId());
			if (cPlayer == null) {
				cm.sendNext("�нT�{�A����Q�b�u�W.");
			} else {
				cPlayer.dropMessage(1, "�A�P��Q�w�g���B.");
				cPlayer.setMarriageId(0);
				cm.setQuestRecord(cPlayer, 160001, "0");
				cm.setQuestRecord(cm.getPlayer(), 160001, "0");
				cm.setQuestRecord(cPlayer, 160002, "0");
				cm.setQuestRecord(cm.getPlayer(), 160002, "0");
				cm.getPlayer().setMarriageId(0);
				cm.sendNext("�A�̦��\���B�F...");
			}
		} else {
			if (selection >= 4210000 && selection < 4210012) {
				if(cm.haveItem(selection)){
					cm.gainItem(selection, -1);
					cm.gainItem(1112300 + (selection-4210000), 1);
					cm.sendOk("�A���٫��洫�o.");
				}
			}
		}		
		cm.dispose();
    }
}