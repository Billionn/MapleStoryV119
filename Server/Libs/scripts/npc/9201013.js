var status = -1;

function action(mode, type, selection) {
    if (mode == 1) {
	status++;
    } else {
	if (status == 0) {
	    cm.dispose();
	}
	status--;
    }
	var marr = cm.getQuestRecord(160001);
	var data = marr.getCustomData();
	if (data == null) {
		marr.setCustomData("0");
	    data = "0";
	}
    if (status == 0) {
		if (data.equals("0")) {
			cm.sendYesNo("�A�Q�n�w���B§��?");
		}else if(data.equals("1")){
			cm.sendOk("�A�w�g�w���F");
			cm.dispose();
		}else{
			cm.sendOk("�A�w�g���B�F");
			cm.dispose();
		}
    } else if (status == 1) {
		if (cm.getPlayer().getMarriageId() <= 0) {
			cm.sendOk("�A�٨S���q�B.");
		} else if (!cm.canHold(4150000,60)) {
			cm.sendOk("��L���w��");
		} else if (!cm.haveItem(5251004,1) && !cm.haveItem(5251005,1) && !cm.haveItem(5251006,1)) {
			cm.sendOk("�бa�۵��B���~��w���B§��.");
		} else {
			var chr = cm.getMap().getCharacterById(cm.getPlayer().getMarriageId());
			if (chr == null) {
				cm.sendOk("�нT�{�A����Q�b�o�i�a�Ϥ�.");
				cm.dispose();
				return;
			}

			if (data.equals("0")) {
			marr.setCustomData("1");
			cm.setQuestRecord(chr, 160001, "1");
			var num = 0;
			if (cm.haveItem(5251006,1)) {
				cm.gainItem(5251006,-1);
				num = 60;
			} else if (cm.haveItem(5251005,1)) {
				cm.gainItem(5251005,-1);
				num = 30;
			} else if (cm.haveItem(5251004,1)) {
				cm.gainItem(5251004,-1);
				num = 10;
			}
			cm.setQuestRecord(cm.getPlayer(), 160002, num + "");
			cm.setQuestRecord(chr, 160002, num + "");
			cm.sendNext("�A�w�g�w���B§�F�A�i�H�o�e�o�ǳߩ����A���˪B�n�ͳ�!");
			cm.gainItemPeriod(4150000,num,1);
			} else if(data.equals("1")){
				cm.sendOk("�A�w�g�w���F");
			}else{
				cm.sendOk("�A�w�g���B�F");
			}
		}
		cm.dispose();
    }
}