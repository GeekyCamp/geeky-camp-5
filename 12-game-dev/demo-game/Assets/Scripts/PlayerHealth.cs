using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.Networking;

public class PlayerHealth : NetworkBehaviour {

	public float maxHealth;
	
	[SyncVar(hook = "OnHealthChange")]
	public float currentHealth;

	public float CurrentHealth {
		get {
			return currentHealth;
		}
	}
	// Use this for initialization
	void Start () {
	}

	void Awake() {
	}
	
	// Update is called once per frame
	void Update () {

	}

	void OnHealthChange(float health) {
		GetComponent<PlayerHUD>().SetCurrentHealth(health);
	}
	public void DoDamage(float amount) {
		if (!isServer) {
			return;
		} 
		currentHealth -= amount;
		if (currentHealth <= 0) {
			Destroy(gameObject);
			
		}
	}
}
