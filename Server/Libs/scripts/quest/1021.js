/* Author: Xterminator (Modified by RMZero213)
	NPC Name: 		Roger
	Map(s): 		Maple Road : Lower level of the Training Camp (2)
	Description: 		Quest - Roger's Apple
*/
var status = -1;

function start(mode, type, selection) {
    if (mode == -1) {
		qm.dispose();
    } else {
	if (mode == 1)
	    status++;
	else
	    status--;
	
	if (status == 0) {
	    qm.sendNext("��, ���F��? �ڬOù�ǡA�i�H�ЧA�@�Ǧ��Ϊ�����");
	} else if (status == 1) {
	    qm.sendNextPrev("�A�ݧڬ�����b�o��? ������!\r�ڷQ�n�оɨ��ǭ�i���������_�I�̡̭C");
	} else if (status == 2) {
	   qm.sendAcceptDecline("�ҥH..... ���ڭ̨Ӫ��I���쪺~!");
	} else if (status == 3) {
	    if (qm.getPlayerStat("HP") >= 50) {
		qm.c.getPlayer().addHP(-25);
//		qm.getPlayer().updateSingleStat(client.MapleStat.HP, 25);
	    }
	    if (!qm.haveItem(2010007)) {
		qm.gainItem(2010007, 1);
	    }
          qm.sendNext("�~��F��? �p�G��q�ܦ�0�A�A�N�|�J��j�·СC�ڵ����|���A�@��#rRoger's Apple#k�C �аȥ����U�ڡC �ϥΫ�A�|�ܱo��j���C ���}������A�����@�Uī�G ��²�檺�A���@�U��L�� #bI#k�N��F��I");
	} else if (status == 4) {
	    qm.sendNextPrev("���H�A�٨S��ڵ��A��ī�G�Y���I�H�Y���A�|�o�{HP�W�ɤF�C�бN��q�^�Ш�100%�A�ӧ�ڧa�C");
	} else if (status == 5) {
	    qm.forceStartQuest();
	    qm.dispose();
	}
    }
}

function end(mode, type, selection) {
    if (mode == -1) {
	qm.dispose();
    } else {
	if (mode == 1)
	    status++;
	else
	    status--;
	if (status == 0) {
	    if (qm.getPlayerStat("HP") < 50) {
		qm.sendNext("���o�A�A�٨S��ڵ��A��ī�G�Y���ڡA���֦Y�F�A�ӧ�ڧa�C");
		qm.dispose();
	    } else {
		qm.sendNext("�A�ݡA�O���O��²��H �A�i�H�b�k�������]�w#b����#k�C �����A�Ať������a�H ��A�C�j�@�q�ɶ��A��q�N�|��_�F�C ���M�ܪ�ɶ��A���n�n�B�Ϊ��ܥi�H���U���֪��C");
	    }
	} else if (status == 1) {
	    qm.sendNextPrev("�n�F�I �ڤw�g�ЧA�ܦh�F�A�ӵ��A§���F�C �o�O�@�ǥ��ӯ����U�A�b�������@�ɪ��@�Ǫ��~�A�Цb��檺�ɭԨϥΥ��̡C");
	} else if (status == 2) {
	    qm.sendNextPrev("���A�گ�ЧA���N�u���o�ǤF �ڪ��D�����L�A���O�ڭ̯u���ӻ��A���F�C �n�n���U�ۤv�a\r\n\r\n#fUI/UIWindow.img/QuestIcon/4/0#\r\n#v2010000# 3 #t2010000#\r\n#v2010009# 3 #t2010009#\r\n\r\n#fUI/UIWindow.img/QuestIcon/8/0# 10 exp");
	} else if (status == 3) {
	    qm.gainExp(10);
	    qm.gainItem(2010000, 3);
	    qm.gainItem(2010009, 3);
	    qm.forceCompleteQuest();
	    qm.dispose();
	}
    }
}
