using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using UnityEngine.Networking;

public class PlayerHUD : NetworkBehaviour {

	public float playerNameOffset;
	public float playerHealthOffset;
	public GameObject healthBarPrefab;

	private GameObject healthBar;

	// Use this for initialization
	void Start () {
		healthBar = Instantiate(healthBarPrefab);
		Transform canvasTransform = GameObject.FindGameObjectWithTag("Canvas").transform;
		healthBar.transform.SetParent(canvasTransform, false);
	}
	
	// Update is called once per frame
	void Update () {
		healthBar.transform.position = Camera.main.WorldToScreenPoint(transform.position + new Vector3(0, playerHealthOffset, 0));
	}

	public void SetCurrentHealth(float health) {
		healthBar.GetComponent<Slider>().value = health;
	}

	void OnDestroy() {
		Destroy(healthBar);
	}

}
