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
    if (cm.getMapId() != 680000210) {
	cm.sendOk("�p�G�A�Q�n���B�A�Ч�ڪ�����פk.");
	cm.dispose();
	return;
    }
    if (status == 0) {
	cm.sendYesNo("�A�ǳƦn�n���W�B�óo�����F?");
    } else if (status == 1) {

	    var marr = cm.getQuestRecord(160001);
	    var data = marr.getCustomData();
	    if (data == null) {
			marr.setCustomData("0");
	        data = "0";
	    }
	    if (data.equals("1")) {
			if (cm.getPlayer().getMarriageId() <= 0) {
				cm.sendOk("�A�S�����B.");
				cm.dispose();
				return;
			}
	    	var chr = cm.getMap().getCharacterById(cm.getPlayer().getMarriageId());
	    	if (chr == null) {
				cm.sendOk("�T�w�A����Q�b�o�i�a�Ϥ�.");
				cm.dispose();
				return;
	    	}
			marr.setCustomData("2_");
			cm.setQuestRecord(chr, 160001, "2_");
			cm.worldMessage(5, "<�W�D " + cm.getClient().getChannel() + "> " + cm.getPlayer().getName() + " �� " + chr.getName() + " ���B§�}�l�|��I");
			cm.doWeddingEffect(chr);
	    } else if (data.equals("2_") || data.equals("2")) {
			if (cm.getPlayer().getMarriageId() <= 0) {
				cm.sendOk("�A�S���M����H���B.");
				cm.dispose();
				return;
			}
			var chr = cm.getMap().getCharacterById(cm.getPlayer().getMarriageId());
			if (chr == null) {
				cm.sendOk("�T�w�A����Q�b�o�i�a�Ϥ�.");
				cm.dispose();
				return;
			}
			cm.setQuestRecord(cm.getPlayer(),160001,"3");
			cm.setQuestRecord(chr,160001,"3");
			var dat = parseInt(cm.getQuestRecord(160002).getCustomData());
			if (dat > 10) {
				cm.warpMap(680000300, 0);
			} else {
				cm.setQuestRecord(chr,160002,"0");
				cm.setQuestRecord(cm.getPlayer(),160002,"0");
				cm.warpMap(680000500, 0);
			}
		} else {
			cm.sendOk("�A���൲�B!");
	    }
	cm.dispose();
    }
}