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
			if(cm.haveItem(4000194,50)){
				cm.sendYesNo("�A�w�g�����F#b#v4000194##t4000194#50��#k�ܡH�ǳƫe���U�@�i�a�ϤF�ܡH");
			}else{
				cm.sendOk("�Ц���#b#v4000194##t4000194#50��#k�~��J���I");
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
		if(cm.haveItem(4000194,50)){
			cm.gainItem(4000194,-50);
			cm.warp(701010322);
			cm.dispose();
		}else{
			cm.sendOk("�X���I");
			cm.dispose();
		}
    }
}

