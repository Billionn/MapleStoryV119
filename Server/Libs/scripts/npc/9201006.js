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
    if (cm.getMapId() != 680000200) {
	cm.dispose();
	return;
    }
    if (status == 0) {
	cm.sendYesNo("�n�}�l�i�J§���?");
    } else if (status == 1) {

	    var marr = cm.getQuestRecord(160001);
	    var data = marr.getCustomData();
	    if (data == null) {
			marr.setCustomData("0");
	        data = "0";
	    }
	    if (data.equals("1")) {
			if (cm.getPlayer().getMarriageId() <= 0) {
				cm.sendOk("�A���������H���B�ܡH");
				cm.dispose();
				return;
			}
	    	var chr = cm.getMap().getCharacterById(cm.getPlayer().getMarriageId());
	    	if (chr == null) {
		    cm.sendOk("�нT�{�A����Q�b�a�Ϥ�");
		    cm.dispose();
		    return;
	    	}
		var maps = Array(680000210, 680000300, 680000401);
		for (var i = 0; i < maps.length; i++) {
		    if (cm.getMap(maps[i]).getCharactersSize() > 0) {
			cm.sendNext("�w�g���H�b�|��B§�A�еy��");
			cm.dispose();
			return;
		    }
		}
		var map = cm.getMap(680000210);
		cm.getPlayer().changeMap(map, map.getPortal(0));
		chr.changeMap(map, map.getPortal(0));
	    } else {
		if (cm.getMap(680000210).getCharactersSize() == 0) {
		    cm.sendNext("�S���|�檺�B§�A�еy��");
		    cm.dispose();
		    return;
		}
		if (cm.haveItem(5090100)) {
		    cm.warp(680000210,0);
		} else {
		    cm.sendOk("�A�S���Щ�");
		}
	    }
	cm.dispose();
    }
}