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
		if(cm.isQuestActive(8512)){
			if(cm.haveItem(4031289)){
				cm.sendYesNo("�̭��D�`�M�I�A�Ф��n�~��e�i!...\r\n�o�O������#b#v4031289##t4031289##k�ܡH���n�a�A�ڥi�H�e�A��̭�\r\n���O�̭��D�`�M�I�A�ǳƦn�F�ܡH");
			}else{
				cm.sendOk("�n��������#b#v4031289##t4031289##k�~��J���I");
				cm.dispose();
			}
		}else if(cm.isQuestFinished(8512)){
				cm.sendOk("���§A�����M���F���G���I");
				cm.dispose();
		}else{
			cm.sendOk("�̭��D�`�M�I�A�Ф��n�~��e�i�I");
			cm.dispose();
		}
    } else if (status == 1) {
		cm.warp(701010321);
		cm.dispose();
    }
}