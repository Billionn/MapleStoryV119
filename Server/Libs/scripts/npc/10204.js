/*
	NPC Name: 		Kyrin
	Map(s): 		Maple Road : Spilt road of choice
	Description: 		Job tutorial, movie clip
*/

var status = -1;

function start() {
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == 1) {
	status++;
    } else {
	if (status == 1) {
	    cm.sendNext("�p�G�A�Q������s���Pı�A�A�Ӹ�ڹ�ܡC");
	    cm.dispose();
	    return;
	}
	status--;
    }
    if (status == 0) {
	cm.sendNext("���s�֦��ǥX���F���M�O�q�A�Q�ΥL�̪��j�b���Z�������A�P�ɦb��Ծ԰����p�U�ϥΥL�̪��O�q�C");
    } else if (status == 1) {
	cm.sendYesNo("�A�Q����@�U���s���Pı�ܡH");
    } else if (status == 2) {
	cm.MovieClipIntroUI(true);
	cm.warp(1020500, 0); // Effect/Direction3.img/pirate/Scene00
	cm.dispose();
    }
}