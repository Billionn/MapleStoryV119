
function act() {
    rm.changeMusic("Bgm02/MissingYou");
	var em = rm.getEventManager("OrbisPQ");
	if (em != null) {
		em.setProperty("stage3", "1");
	}
}