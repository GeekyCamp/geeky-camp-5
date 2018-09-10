package rest;

import java.util.HashSet;
import java.util.Set;

import javax.ws.rs.ApplicationPath;
import javax.ws.rs.core.Application;

@ApplicationPath("/")
public class RestApp extends Application {

    public Set<Class<?>> getClasses() {
    	Set<Class<?>> set = new HashSet<Class<?>>();
    	set.add(Endpoints.class);
    	return set;
    }
	
}
