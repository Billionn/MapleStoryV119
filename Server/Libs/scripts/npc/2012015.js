/**
	El Nath Magic Spot - Orbis Tower <20th Floor>(200080200)
**/

var status = -1;

function action(mode, type, selection) {
    if (mode == 0) {
	cm.dispose();
	return;
    }
    status++;

    if (status == 0) {
	if (cm.haveItem(4001019)) {
	    cm.sendYesNo("�A�T�w�n�ϥ� #b#i4001019##t4001019 #?");
	} else {
	    cm.sendOk("�нT�{�A���I�]���֦� #b#i4001019##t4001019#");
	    cm.safeDispose();
	}
    }
    if (status == 1) {
	cm.gainItem(4001019, -1);
	cm.warp(200080200,0);
	cm.dispose();
    }
}
