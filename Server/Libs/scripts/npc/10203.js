/*
	NPC Name: 		Dark Lord
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
	    cm.sendNext("�p�G�A�Q����s�骺�Pı�A�A�Ӹ�ڹ�ܡC");
	    cm.dispose();
	    return;
	}
	status--;
    }
    if (status == 0) {
	cm.sendNext("�s��O�B��M�F�өM�O�q���������X�A���̵����L�`���ĤH�i���ŧ�C�������j�ײv�M�t�פ��\�s��ΦU�ب��ק����ĤH�C");
    } else if (status == 1) {
	cm.sendYesNo("�A�Q����@�U�s��ݬݶܡH");
    } else if (status == 2) {
	cm.MovieClipIntroUI(true);
	cm.warp(1020400, 0); // Effect/Direction3.img/rouge/Scene00
	cm.dispose();
    }
}