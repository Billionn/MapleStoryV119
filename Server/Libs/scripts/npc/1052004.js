/* Denma the Owner
	Henesys VIP Eye Change.
*/
var status = -1;
var facetype;

function start() {
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == 0) {
	cm.dispose();
	return;
    } else {
	status++;
    }

    if (status == 0) {
	cm.sendNext("���U�N�s �A�Q���Q���i�Ӯ��y�e�O? �u�ݭn�@�i #b#t5152001##k, �A�N�i�H�֦��l���M�h�Ϊ��y�e�F");
    } else if (status == 1) {
	var face = cm.getPlayerStat("FACE");

	if (cm.getPlayerStat("GENDER") == 0) {
	    facetype = [20000, 20001, 20002, 20003, 20004, 20005, 20006, 20007, 20008, 20012, 20014];
	} else {
	    facetype = [21000, 21001, 21002, 21003, 21004, 21005, 21006, 21007, 21008, 21012, 21014];
	}
	for (var i = 0; i < facetype.length; i++) {
	    facetype[i] = facetype[i] + face % 1000 - (face % 100);
	}
	cm.askAvatar("�A�ݧA���w���i�y�e �u�ݭn#b#t5152001##k, �N�i�H���A�����l���M�h�Ϊ��y�e�F", facetype);
    } else if (status == 2){
	if (cm.setAvatar(5152001, facetype[selection]) == 1) {
	    cm.sendOk("Enjoy your new and improved face!");
	} else {
	    cm.sendOk("�ݨӧA�S���D��O ���U�N�s");
	}
	cm.dispose();
    }
}
