/* Author: Xterminator
	NPC Name: 		Joel
	Map(s): 		Victoria Road : Ellinia Station (101000300)
	Description: 		Ellinia Ticketing Usher
*/
var status = -1;

function action(mode, type, selection) {
    if (mode == 1) {
	status++;
    } else {
	cm.sendNext("You must have some business to take care of here, right?");
	cm.safeDispose();
	return;
    }
    if (status == 0) {
	cm.sendYesNo("hi�A�n�ڬO��c���\r\n�q���ѪŤ�������{��C�i�O#b5000����");
    } else if (status == 1) {
	if (cm.getMeso() < 5000) {
	    cm.sendNext("�нT�{�A���֦�#b5000����");
	    cm.safeDispose();
	} else {
	    cm.gainMeso(-5000);
	    cm.gainItem(4031045, 1);
            cm.sendOk("����A�a")
	    cm.dispose();
	}
    }
}