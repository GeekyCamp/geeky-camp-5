using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Bullet : MonoBehaviour {

	public float damageAmount;
	public float timeToLive;
	// Use this for initialization
	void Start () {
		
	}
	
	// Update is called once per frame
	void Update () {
		timeToLive -= Time.deltaTime;
		if(timeToLive <= 0) {
			Destroy(gameObject);
		}
	}

	void OnCollisionEnter(Collision collision) {
		GameObject other = collision.gameObject;
		if(other.tag == "PlayerTag") {
			PlayerHealth health = other.GetComponent<PlayerHealth>();
			health.DoDamage(damageAmount);
		}

		Destroy(gameObject);
	}
}
