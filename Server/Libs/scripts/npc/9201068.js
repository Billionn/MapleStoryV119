var sw;

function start() {
	status = -1;
	sw = cm.getEventManager("Subway");
	action(1, 0, 0);
}

function action(mode, type, selection) {
	status++;
	if (mode == 0) {
		cm.sendNext("�i�������....");
		cm.dispose();
		return;
	}
	if (status == 0) {
		if (sw == null) {
			cm.sendNext("�o�Ϳ��~�Ц^��GM");
			cm.dispose();
		} else if (sw.getProperty("entry").equals("true")) {
			cm.sendYesNo("�аݧA�O�_�n�f�����Z�a�K�O??");
		} else if (sw.getProperty("entry").equals("false") && sw.getProperty("docked").equals("true")) {
			cm.sendNext("�ܩ�p���Z�a�K���ǳƥX�o,�ɶ���i�H�h�Ⲽ�x��.");
			cm.dispose();
		} else {
			cm.sendNext("�Э@�ߵ��ݴX�����A���b��z�a�K���I");
			cm.dispose();
		}
	} else if (status == 1) {
		if (cm.getMapId() == 103000100) {
			if (!cm.haveItem(4031711)) {
				cm.sendNext("�f���a�K�ݭn#b#t4031711##k ��!");
			} else {
				cm.gainItem(4031711, -1);
				cm.warp(600010004);
			}
			cm.dispose();
		} else if (cm.getMapId() == 600010001) {
			if (!cm.haveItem(4031713)) {
				cm.sendNext("�f���a�K�ݭn#b#t4031713##k ��!");
			} else {
				cm.gainItem(4031713, -1);
				cm.warp(600010002);
			}
			cm.dispose();
		}
	}
}
