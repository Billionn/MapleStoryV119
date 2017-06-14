/* Author: Xterminator
	NPC Name: 		VIP Cab
	Map(s): 		Victoria Road : Lith Harbor (104000000)
	Description: 		Takes you to Ant Tunnel Park
*/
var status = 0;
var cost;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (status >= 1 && mode == 0) {
	cm.sendNext("���A���ܤ߷N�F�b�ӧa");
	cm.dispose();
	return;
    }
    if (mode == 1)
	status++;
    else
	status--;
    if (status == 0) {
	cm.sendNext("��,�o�O�ߤ@��VIP�p�{�� �u�ݭn10000���� �Y�i���A�e�� \r\n#b�����q�|#k.");
    } else if (status == 1) {
	var job = cm.getJob();
	if (job == 0 || job == 2000 || job == 1000) {
	    cm.sendYesNo("�ڭ̹��s�⦳90%�馩 �u�ݭn#b1,000 ����#k?");
	    cost = 1000;
	} else {
	    cm.sendYesNo("�A�T�w�n�e�������q�|? �N����#b10,000 ����#k?");
	    cost = 10000;
	}
    } else if (status == 2) {
	if (cm.getMeso() < cost) {
	    cm.sendNext("��p�A����������")
	} else {
	    cm.gainMeso(-cost);
	    cm.warp(105070001, 0);
	}
	cm.dispose();
    }
}