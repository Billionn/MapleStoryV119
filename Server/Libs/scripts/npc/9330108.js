/* Kedrick
	Fishking King NPC
*/

/* global cm */

var status = -1;
var sel;

function action(mode, type, selection) {
    if (mode == 1) {
	status++;
    } else {
		if (status == 0) {
			cm.dispose();
			return;
		}
	status--;
    }

    if (status == 0) {
	cm.sendSimple("�z�Q������H\n\r #b#L0#�i�J������#l \n\r #L2#��^�¦a��#l");
    } else if (status == 1) {
	sel = selection;
	if (sel == 0) {
	    cm.sendSimple("���@�ӡH\r\n#b#L0#�P�ų�����#l\r\n#L1#�ڤ۳�����#l\r\n#L2#�Ӯa�۹ҳ�����#l#k");
	} else if (sel == 2) {
	    var returnMap = cm.getSavedLocation("FISHING");
	    if (returnMap < 0 || cm.getMap(returnMap) == null) {
		returnMap = 910000000; // to fix people who entered the fm trough an unconventional way
	    }
	    cm.clearSavedLocation("FISHING");
	    cm.warp(returnMap,0);
	    cm.dispose();
	}
    } else if (status == 2) {
	if (sel == 0 && selection <= 2 && selection >= 0) {
	    if (cm.getPlayer().getMapId() < 749050500 || cm.getPlayer().getMapId() > 749050502) {
	    	cm.saveLocation("FISHING");
	    }
	    cm.warp(749050500 + selection);
	    cm.dispose();
	} else {
	    cm.dispose();
	}
    }
}