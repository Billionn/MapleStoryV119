/* 
	NPC Name: 		Shanks
	Map(s): 		Maple Road : Southperry (60000)
	Description: 		Brings you to Victoria Island
*/
var status = 0;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (status >= 0 && mode == 0) {
	cm.sendOk("��...�A�b�o���٦��ƭn���ܡH");
	cm.dispose();
	return;
    }
    if (mode == 1)
	status++;
    else
	status--;

    if (status == 0) {
	cm.sendYesNo("���o����A�A�|�h�@�ӧ�j���q���C�u�n #e150����#n �A�ڷ|�a�A��#b���h�Q�ȴ�#k�C���O�A�@���A���}�o�Ӧa��A�A�N����^�ӤF�C�A������Q�k�H�A�Q�h���h�Q�ȴ�ܡH");
    } else if (status == 1) {
	if (cm.haveItem(4031801)) {
	    cm.sendNext("�n�a�A�{�b����150�ӷ���...�x�A���O����H���O#b���d�������˫H#k�ܡH�K�A�A���Ӹ�ڻ��A���o�ӡC�ڡA��J���A��ڬݨ�A�A�Pı�찶�j�A�]���A�O���d�����˨Ӫ��A�ڬݨ�A�@���@�ӫ_�I�a�j�j����O�C�ڨS����k���A�o���Ȧ�O�ΡI");
	} else {
	    cm.sendNext("�b�o�Ӧa��ܵL��ܡH�ӳo��...������#e150 ����#n...");
	}
    } else if (status == 2) {
	if (cm.haveItem(4031801)) {
	    cm.sendNextPrev("�J�M�A�����˫H�A�ڴN�����A�����F�C�n�a�A��í�F�A�]���ڭ̲{�b�n�h���h�Q�ȴ�A���i��|���I�n�̡I�I");
	} else {
	    if (cm.getPlayerStat("LVL") >= 7) {
		if (cm.getMeso() < 150) {
		    cm.sendOk("����H�A�Q�i�D�ڧA�Q�h�o�S�����ܡH�A�u�O�@�өǤH...");
		    cm.dispose();
		} else {
		    cm.sendNext("�n�I#e150 ����#n�ڤw�g����F�I�X�o�A�h���h�Q�ȴ�I");
		}
	    } else {
		cm.sendOk("���ڬݬ�...�ڤ��{���A���j�C�A�����ܤ�7���h���h�Q�ȴ�C");
		cm.dispose();
	    }
	}
    } else if (status == 3) {
	if (cm.haveItem(4031801)) {
	    cm.gainItem(4031801, -1);
	    cm.warp(2010000,0);
	    cm.dispose();
	} else {
	    cm.gainMeso(-150);
	    cm.warp(2010000,0);
	    cm.dispose();
	}
    }
}