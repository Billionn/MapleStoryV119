/**
	Orbis Magic Spot - Orbis Tower <1st Floor>(200082100)
**/

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == 0) {
	cm.dispose();
	return;
    }
    status++;
    if (status == 0) {
	if(cm.haveItem(4001019)) {
	    cm.sendYesNo("�A�T�w�n�ϥ� #b#i4001019##t4001019 #?");
	} else {
	    cm.sendOk("�нT�{�A���I�]���֦� #b#t4001019#");
	    cm.dispose();
	}
    }
    if (status == 1) {
	cm.gainItem(4001019, -1);
	cm.warp(200082100,0);
	cm.dispose();
    }
}
