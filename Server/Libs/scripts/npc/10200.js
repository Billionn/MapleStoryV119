/*
	NPC Name: 		Athena Pierce
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
	cm.sendNext("�p�G�A�Q����}�b�⪺�Pı�A�A�Ӹ�ڹ�ܡC");
	    cm.dispose();
	    return;
	}
	status--;
    }
    if (status == 0) {
	cm.sendNext("�}�b�⦳�F�ӻP�O�q���䴩�A�D�n�t�d���~�����A���e�u���԰��̴��Ѥ䴩�C�D�`�ժ��ϥΤ}�A�@���������@�����C");
    } else if (status == 1) {
	cm.sendYesNo("�A�Q����@�U�}�b�⪺�Pı�ܡH");
    } else if (status == 2) {
	cm.MovieClipIntroUI(true);
	cm.warp(1020300, 0); // Effect/Direction3.img/archer/Scene00
	cm.dispose();
    }
}