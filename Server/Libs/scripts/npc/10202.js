/*
	NPC Name: 		Dances with Balrog
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
	    cm.sendNext("�p�G�A�Q����C�h���Pı�A�A�Ӹ�ڹ�ܡC");
	    cm.dispose();
	    return;
	}
	status--;
    }
    if (status == 0) {
	cm.sendNext("�C�h�֦��@�ӱj�j���O�q�P��q�A�L�̨ɨ��̥������j���԰��C�ӥB�A�ðt�ƤF�������ޯ�A�o��¾�~�֦��j�j�������O�C");
    } else if (status == 1) {
	cm.sendYesNo("�A�Q����@�U�C�h�ݬݶܡH");
    } else if (status == 2) {
	cm.MovieClipIntroUI(true);
	cm.warp(1020100, 0); // Effect/Direction3.img/swordman/Scene00
	cm.dispose();
    }
}