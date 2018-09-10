package rest;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import com.google.gson.Gson;

import db.DbConnection;

@Path("/rest")
public class Endpoints {

	@GET
	@Path("hello-world")
	@Produces(MediaType.TEXT_PLAIN)
	public Response helloWorld() {
		return Response.status(200).entity("Hello Rest World #2").build();
	}
	
	@GET
	@Path("/records")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getAll() {
		EntityManager em = null;
		try {
			em = DbConnection.factory.createEntityManager();
			TypedQuery<db.Record> query = em.createQuery("SELECT r FROM Record r ORDER BY r.id", db.Record.class);
			List<db.Record> records = query.getResultList();
			Gson gson = new Gson();
			String json = gson.toJson(records);
			return Response.status(200).entity(json).build();
		} finally {
			if (em != null) {
				em.close();
			}
		}
	}
	
	@PUT
	@Path("/records/{id}")
	@Consumes(MediaType.APPLICATION_JSON)
	public Response update(@PathParam("id") long id, String body) {
		EntityManager em = null;
		try {
			em = DbConnection.factory.createEntityManager();
			em.getTransaction().begin();
			Gson gson = new Gson();
			db.Record record = gson.fromJson(body, db.Record.class);
			em.merge(record);
			em.getTransaction().commit();
			return Response.status(200).build();
		} finally {
			if (em != null) {
				em.close();
			}
		}
	}
	
	@POST
	@Path("/records")
	@Consumes(MediaType.APPLICATION_JSON)
	public Response createNew(String body) {
		EntityManager em = null;
		try {
			em = DbConnection.factory.createEntityManager();
			em.getTransaction().begin();
			Gson gson = new Gson();
			db.Record record = gson.fromJson(body, db.Record.class);
			em.persist(record);
			em.getTransaction().commit();
			return Response.status(201).build();
		} finally {
			if (em != null) {
				em.close();
			}
		}
	}
	
	@DELETE
	@Path("/records/{id}")
	public Response delete(@PathParam("id") long id) {
		EntityManager em = null;
		try {
			em = DbConnection.factory.createEntityManager();
			db.Record record = em.find(db.Record.class, id);
			em.getTransaction().begin();
			if (record == null) {
				return Response.status(404).build();
			}
			em.remove(record);
			em.getTransaction().commit();
			return Response.status(200).build();
		} finally {
			if (em != null) {
//				em.close();
			}
		}
	}
}
