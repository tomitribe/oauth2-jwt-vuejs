package org.superbiz.moviefun.rest;

import org.superbiz.moviefun.Movie;
import org.superbiz.moviefun.MoviesBean;

import javax.ejb.EJB;
import javax.enterprise.context.ApplicationScoped;
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
import java.util.List;

@Path("movies")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
@ApplicationScoped
public class MovieResource {
    @EJB
    private MoviesBean moviesBean;

    @POST
    public Response create(final Movie movie) {
        final Movie movieEntity = new Movie(
                movie.getTitle(), movie.getDirector(), movie.getGenre(), movie.getRating(), movie.getYear());
        moviesBean.addMovie(movieEntity);
        return Response.ok().entity(movieEntity).build();
    }

    @PUT
    @Path("{id}")
    public Response update(@PathParam("id") final String id, final Movie movie) {
        final Movie movieEntity = moviesBean.find(id);
        movieEntity.setTitle(movie.getTitle());
        movieEntity.setDirector(movie.getDirector());
        movieEntity.setGenre(movie.getGenre());
        movieEntity.setRating(movie.getRating());
        movieEntity.setYear(movie.getYear());
        moviesBean.editMovie(movieEntity);
        return Response.ok().entity(movieEntity).build();
    }

    @GET
    @Path("{id}")
    public Response read(final String id) {
        final Movie movie = moviesBean.find(id);
        return Response.ok().entity(movie).build();
    }

    @DELETE
    @Path("{id}")
    public void delete(final String id) {
        moviesBean.deleteMovie(id);
    }

    @GET
    public Response findAll() {
        final List<Movie> movies = moviesBean.getMovies(null, null, null, null);
        return Response.ok().entity(movies).build();
    }

    @GET
    @Path("count")
    @Produces(MediaType.TEXT_PLAIN)
    public int count() {
        return moviesBean.count(null, null);
    }
}
