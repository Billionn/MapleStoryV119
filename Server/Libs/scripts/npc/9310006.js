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
			var em = cm.getEventManager("ChineseBoss");
			if(em == null){
				cm.sendOk("���Ȥ��i��");
				cm.dispose();
			}else if (em.getProperty("state").equals("0")) {
				em.startInstance(cm.getPlayer());
				cm.dispose();
			}else{
				cm.sendOk("�w�g���H�b�D�Ը��G���F�A�е��@�U");
				cm.dispose();
			}
			
    } else if (status == 1) {
			cm.warp(701010323);
			cm.dispose();
    }
}

