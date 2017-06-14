/*
	NPC Name: 		Grendel the Really Old
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
	    cm.sendNext("�p�G�A�Q����k�v���Pı�A�A�Ӹ�ڹ�ܡC");
	    cm.dispose();
	    return;
	}
	status--;
    }
    if (status == 0) {
	cm.sendNext("�k�v�����R���ݩʬ��򥻪��k�N�M���U�]�k�A�����U��ӹζ��C�ĤG����¾��A�ݩʪ��]�k�N���Ѥj�q���ۧJ���ݩʼĤH�y���ˮ`�C");
    } else if (status == 1) {
	cm.sendYesNo("�A�Q����@�U�k�v���Pı�ܡH");
    } else if (status == 2) {
	cm.MovieClipIntroUI(true);
	cm.warp(1020200, 0); // Effect/Direction3.img/magician/Scene00
	cm.dispose();
    }
}