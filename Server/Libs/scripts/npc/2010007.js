/* guild creation npc */
var status = -1;
var sel;

function start() {
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == 0 && status == 0) {
	cm.dispose();
	return;
    }
    if (mode == 1)
	status++;
    else
	status--;

    if (status == 0)
	cm.sendSimple("�A�Q���ƻ�?\r\n#b#L0#�Ыؤ��|#l\r\n#L1#�Ѵ����|#l\r\n#L2#�ϥη����X�R���|�H��(����100)#l\r\n#L3#�ϥ�GP�X�R���|�H��(����200)#l#k");
    else if (status == 1) {
	sel = selection;
	if (selection == 0) {
	    if (cm.getPlayerStat("GID") > 0) {
		cm.sendOk("�A�w�g���u�|�F.");
		cm.dispose();
	    } else
		cm.sendYesNo("�إߤ��|�N��O�A#b500,000 ����#k, �T�w��?");
	} else if (selection == 1) {
	    if (cm.getPlayerStat("GID") <= 0 || cm.getPlayerStat("GRANK") != 1) {
		cm.sendOk("�u���|���i�H�Ѵ����|.");
		cm.dispose();
	    } else
		cm.sendYesNo("�A�T�w�n�Ѵ����|��?");
	} else if (selection == 2) {
	    if (cm.getPlayerStat("GID") <= 0 || cm.getPlayerStat("GRANK") != 1) {
		cm.sendOk("�u�����|���i�H�X�R�H��");
		cm.dispose();
	    } else
		cm.sendYesNo("�X�R #b5#k �Ӥ��|���A��O #b500,000 ����#k, �T�w��?");
	} else if (selection == 3) {
	    if (cm.getPlayerStat("GID") <= 0 || cm.getPlayerStat("GRANK") != 1) {
		cm.sendOk("�u�����|���i�H�X�R�H��");
		cm.dispose();
	    } else
		cm.sendYesNo("�X�R #b5#k �Ӥ��|���A��O #b2500 GP#k, �T�w��?");
	}
    } else if (status == 2) {
	if (sel == 0 && cm.getPlayerStat("GID") <= 0) {
	    cm.genericGuildMessage(1);
	    cm.dispose();
	} else if (sel == 1 && cm.getPlayerStat("GID") > 0 && cm.getPlayerStat("GRANK") == 1) {
	    cm.disbandGuild();
	    cm.dispose();
	} else if (sel == 2 && cm.getPlayerStat("GID") > 0 && cm.getPlayerStat("GRANK") == 1) {
	    cm.increaseGuildCapacity(false);
	    cm.dispose();
	} else if (sel == 3 && cm.getPlayerStat("GID") > 0 && cm.getPlayerStat("GRANK") == 1) {
	    cm.increaseGuildCapacity(true);
	    cm.dispose();
	}
    }
}