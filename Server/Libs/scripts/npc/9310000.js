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
    if (status == 0) {
	cm.sendYesNo("�ɨ��b�Ѫŭ����O�@��ܲn�֪���!��a�H\r\n�̵ۧڪ��M�~��O�A�b�Ѫŭ����w���L����!\r\n�A�Q��#r�W���y#k�ܡH");
    } else if (status == 1) {
		cm.warp(701000100);
		cm.dispose();
    }
}