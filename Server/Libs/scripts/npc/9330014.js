var status = 0;
function start() {
	cm.sendYesNo("�z�Q�n�e���Z��������?�u�ݭn5000����");
}

function action(mode, type, selection) {
	if (mode != 1) {
		cm.dispose();
		return;
	}
	status++;
	if (status == 1) {
		if (cm.getMeso() < 5000) {
			cm.sendNext("�z�S��5000������!");
		} else {
			cm.gainMeso(-5000);
			cm.warp(103000100);
		}
		cm.dispose();
	}
}
