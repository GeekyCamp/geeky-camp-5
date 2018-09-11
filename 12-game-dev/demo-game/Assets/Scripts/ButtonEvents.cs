using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class ButtonEvents : MonoBehaviour {

	// Use this for initialization
	void Start () {
		
	}
	
	// Update is called once per frame
	void Update () {
		
	}

	public void OnCreateGameClick() {
		Debug.Log("Create Game Clicked");
	}

	public void OnJoinGameClick() {
		Debug.Log("Join Game Clicked");
	}

	public void OnResumeClick() {
		Debug.Log("Resume clicked");
	}

	public void OnQuitClick() {
		Debug.Log("Quit Clicked");
	}
}
