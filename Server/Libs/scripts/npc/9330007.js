var status = 0;

function start() {
	cm.sendYesNo("�аݬO�_�Q�h����m??");
}

function action(mode, type, selection) {
	if (mode != 1) {
		cm.dispose();
		return;
	}
	status++;
	if (status == 1) {
		if (cm.getMeso() < 2000) {
			cm.sendNext("�ݭn2000����!");
		} else {
			cm.gainMeso(-2000);
			cm.warp(740000100);
		}
		cm.dispose();
	}
}
