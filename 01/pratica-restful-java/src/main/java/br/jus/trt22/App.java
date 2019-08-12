package br.jus.trt22;

import org.eclipse.jetty.server.Server;
import org.eclipse.jetty.servlet.ServletContextHandler;
import org.eclipse.jetty.servlet.ServletHolder;
import org.glassfish.jersey.server.ResourceConfig;
import org.glassfish.jersey.server.ServerProperties;
import org.glassfish.jersey.servlet.ServletContainer;

import br.jus.trt22.jpa.ProcessosJPAApi;

public class App {

    // mvn clean compile exec:java -Dexec.mainClass="br.jus.trt22.App"
    public static void main(String[] args) throws Exception {

        ResourceConfig config = new ResourceConfig();
        config.property(ServerProperties.BV_SEND_ERROR_IN_RESPONSE, true)
            .property(ServerProperties.PROVIDER_CLASSNAMES,
                new String[] { ProcessosApi.class.getCanonicalName(), ProcessosJPAApi.class.getCanonicalName() });

        ServletHolder jerseyServlet = new ServletHolder(new ServletContainer(config));
        jerseyServlet.setInitOrder(0);

        Server jettyServer = new Server(8080);

        ServletContextHandler context = new ServletContextHandler(jettyServer, "/");
        context.addServlet(jerseyServlet, "/*");

        try {
            jettyServer.start();
            jettyServer.join();
        } finally {
            jettyServer.destroy();
        }
    }
}