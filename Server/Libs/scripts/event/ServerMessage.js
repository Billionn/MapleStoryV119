var Message = new Array(
    "���G���}�F�� �ѧ��A�������U�h�䤽�wA��50�Ӷ¦Ϥ�N�i�H�i�h�F �i�H1~4�H�@�_����",
    "�p�G�J�줣���I�ޯ�/��O��/����i���I/�����INPC,�Цb��ܮإ�@ea�N�i�H�F",
    "/��H ���a�W�r �i�H�Ψӧ�H��",
    "�����D��RC1108523����",
    "�@�W�}�b��V�m��I�ʤH����",
    "�d������F�ӤH�i�H�h�ۥѥ����J�f��J�|§������");

var setupTask;

function init() {
    scheduleNew();
}

function scheduleNew() {
    setupTask = em.schedule("start", 300000);
}

function cancelSchedule() {
	setupTask.cancel(false);
}

function start() {
    scheduleNew();
    em.broadcastYellowMsg("[���������U]" + Message[Math.floor(Math.random() * Message.length)]);
}