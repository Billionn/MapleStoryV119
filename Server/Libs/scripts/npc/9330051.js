/* Natalie
	Henesys VIP Hair/Hair Color Change.
*/
var status = -1;
var beauty = 0;
var hair_Colo_new;

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
	cm.sendSimple("�A�Q���v�����ܭn��#b#t5150029##k �Ϊ�  #b#t5151024##k ���ܴN�i�H�o\r\n#L0#�žv: #i5150029##t5150029##l\r\n#L1#�V�v: #i5151024##t5151024##l");
    } else if (status == 1) {
	if (selection == 0) {
	    var hair = cm.getPlayerStat("HAIR");
	    hair_Colo_new = [];
	    beauty = 1;

	    if (cm.getPlayerStat("GENDER") == 0) {
		hair_Colo_new = [33430, 33400, 33250, 33120, 33090, 33340, 33160, 32640, 30920, 30820, 33100, 33000, 39110];
	    } else {
		hair_Colo_new = [34450, 34160, 34090, 31990, 37000, 38110, 37800, 35300, 31830, 38580, 34890, 34240, 39100];
	    }
	    for (var i = 0; i < hair_Colo_new.length; i++) {
		hair_Colo_new[i] = hair_Colo_new[i] + (hair % 10);
	    }
	    cm.askAvatar("�Q�������ثܴΪ��v���O �u�n�� #b#t5150029##k �ڴN�i�H���A���@�ӫܴΪ��v����", hair_Colo_new);
	} else if (selection == 1) {
	    var currenthaircolo = Math.floor((cm.getPlayerStat("HAIR") / 10)) * 10;
	    hair_Colo_new = [];
	    beauty = 2;


	    for (var i = 0; i < 8; i++) {
		hair_Colo_new[i] = currenthaircolo + i;
	    }
	    cm.askAvatar("�A�Q�V�������C��?", hair_Colo_new);
	}
    } else if (status == 2){
	if (beauty == 1){
	    if (cm.setAvatar(5150029, hair_Colo_new[selection]) == 1) {
		cm.sendOk("Enjoy your new and improved hairstyle!");
	    } else {
		cm.sendOk("�ݨӧڨS��k���A���Y�v��");
	    }
	} else {
	    if (cm.setAvatar(5151024, hair_Colo_new[selection]) == 1) {
		cm.sendOk("Enjoy your new and improved haircolor!");
	    } else {
		cm.sendOk("�ݨӧڨS��k���A�V�Y�v��");
	    }
	}
	cm.dispose();
    }
}