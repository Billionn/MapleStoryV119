var status = -1;

function start(mode, type, selection) {
    qm.dispose();
}

function end(mode, type, selection) {
	qm.forceStartQuest(21202, "0");
	qm.forceStartQuest(21201);
	qm.dispose();
}