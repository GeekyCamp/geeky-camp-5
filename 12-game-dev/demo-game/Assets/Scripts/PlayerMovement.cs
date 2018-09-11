using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.Networking;

public class PlayerMovement : NetworkBehaviour {
	public float movementSpeed;
	public float gravityModifier;
	public float jumpTakeoffSpeed;
	public float movementLerpFactor;
	
	public float fallingLerpFactor;
	public bool isGrounded = true;
	public Vector3 velocity = Vector3.zero;

	private RaycastHit[] hitBufferList;
	// Use this for initialization
	void Start () {
	}
	
	void FixedUpdate() {
		if (!isLocalPlayer) {
			return;
		}
		velocity += Physics.gravity * gravityModifier * Time.deltaTime;
		Vector3 deltaPosition = velocity * Time.deltaTime;
		Vector3 movement = Vector2.up * deltaPosition.y;
		isGrounded = false;

		handleMovement(movement);

		movement = Vector3.right * velocity.x;
		handleMovement(movement);
	}

	// Update is called once per frame
	void Update () {
		if(!isLocalPlayer) {
			return;
		}

		if(Input.GetKeyDown(KeyCode.Space) && isGrounded) {
			velocity.y = jumpTakeoffSpeed;
			isGrounded = false;
		}
		float xMovement = movementSpeed * Input.GetAxis("Horizontal");
		velocity.x = xMovement;
		//Vector3 newXPosition = transform.position + Vector3.right * xMovement;
		//transform.position = Vector3.Lerp(transform.position, newXPosition, movementLerpFactor);	
	}

	protected void handleMovement(Vector3 movement) {
		float distance = movement.magnitude;

		hitBufferList = Physics.BoxCastAll(transform.position, new Vector3(0.5f, 1f, 0.5f) , movement.normalized, transform.rotation, distance + 0.01f, Physics.DefaultRaycastLayers);
		foreach (RaycastHit hit in hitBufferList) {
			float projection = Vector3.Dot(velocity, hit.normal);
			velocity = velocity - projection * hit.normal;
			float modifiedDistance = hit.distance - 0.01f;
			distance = modifiedDistance < distance ? modifiedDistance : distance;
			isGrounded = true;
		}
		transform.position = Vector3.Lerp(transform.position, transform.position + movement.normalized * distance, fallingLerpFactor);
	}
}
