using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.Networking;
public class PlayerShoot : NetworkBehaviour {

	public GameObject bulletPrefab;
	public GameObject weapon;
	public Transform muzzle;
	public float bulletVelocity;
	// Use this for initialization
	void Start () {
		
	}

	void Awake() {

	}
	
	// Update is called once per frame
	void Update () {
		if(!isLocalPlayer) {
			return;
		}

		float distanceToMuzzle = (Camera.main.transform.position - muzzle.position).magnitude;
		Vector3 mousePosition = new Vector3(Input.mousePosition.x, Input.mousePosition.y, distanceToMuzzle);
		Vector3 target = Camera.main.ScreenToWorldPoint(mousePosition);
		target.z = muzzle.position.z;
		Vector3 gunDirection = (target - weapon.transform.position).normalized;
		Quaternion rotation = Quaternion.LookRotation(gunDirection);

		if(Vector3.Dot(gunDirection, transform.forward) < 0 && Mathf.Abs(target.x - transform.position.x) > 1) {
			transform.Rotate(0, 180, 0);
		} 

		weapon.transform.localRotation = Quaternion.Euler(rotation.eulerAngles.x + 90, 0, 0);
		if(Input.GetKeyDown(KeyCode.Mouse0)){
			CmdFire(target);
		}
	}

	[Command]
	void CmdFire(Vector3 target) {
		GameObject bullet = GameObject.Instantiate(bulletPrefab, muzzle.position, muzzle.rotation);
		Vector3 shootDirection = target - muzzle.position;
		if (Vector3.Dot(shootDirection, muzzle.up) < 0) {
			shootDirection = muzzle.up;
		}
		bullet.GetComponent<Rigidbody>().velocity = shootDirection.normalized * bulletVelocity;
		NetworkServer.Spawn(bullet);
	}
}
