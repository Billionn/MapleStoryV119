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
	if(cm.getMapId() != 741020100){
		cm.warp(741020100);
		cm.dispose();
	}
    if (status == 0) {
		if(cm.isQuestActive(8626) && cm.haveItem(4031356) ){
			if(cm.haveItem(4000259,50)){
				cm.sendYesNo("�A�w�g�����F#b#v4000259##t4000259#50��#k�ܡH�ǳƫe���U�@�i�a�ϤF�ܡH");
			}else{
				cm.sendOk("�o���O�e�U���!���O�e���D�`�M�I�A��#b�½��j��#k�b�̭��A�Y�u���n�e�i���ܡA�Ц���#b#v4000259##t4000259#50��#k�~��J���I");
				cm.dispose();
			}
		}else if(cm.isQuestFinished(8626)){
				cm.warp(741020102);
				cm.dispose();
		}else{
			cm.sendOk("�̭��D�`�M�I�A�Ф��n�~��e�i�I");
			cm.dispose();
		}
    } else if (status == 1) {
		if(cm.haveItem(4000259,50) && cm.getPlayerCount(741020101) == 0){
			cm.resetMap(741020101);
			cm.gainItem(4000259,-50);
			cm.warp(741020101);
			cm.dispose();
		}else{
			cm.sendOk("�̭����H�b���½��j���F�I");
			cm.dispose();
		}
    }
}

