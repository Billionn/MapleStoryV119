/*
	Purin - Before Takeoff To Orbis(101000301)
*/

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    status++;
    if(mode == 0) {
	cm.sendOk("��ܧִN�|��F�ѪŤ����F�C");
	cm.dispose();
	return;
    }
    if(status == 0) {
	cm.sendYesNo("�A�Q���}�ܡH�A�������|�h�١C �o�˱z�ٽT�w�n���}�o�өж��ܡH");
    } else if(status == 1) {
	cm.warp(101000300, 0);
	cm.dispose();
    }
}
