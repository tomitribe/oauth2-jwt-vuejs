package org.superbiz.moviefun.rest;

import org.superbiz.model.CreateMovie;
import org.superbiz.model.Movie;
import org.superbiz.model.Movies;
import org.superbiz.model.UpdateMovie;
import org.superbiz.model.rest.MoviesResource;
import org.superbiz.moviefun.MoviesBean;

import javax.ejb.EJB;
import javax.enterprise.context.ApplicationScoped;
import javax.ws.rs.GET;
import javax.ws.rs.core.Response;
import java.util.List;
import java.util.stream.Collectors;

@ApplicationScoped
public class MoviesResourcesImpl implements MoviesResource {
    @EJB
    private MoviesBean moviesBean;

    @GET
    public Response findAll() {
        final List<Movie> movieList =
                moviesBean.getMovies(null, null, null, null)
                          .stream()
                          .map(movieEntity -> Movie.builder()
                                                   .id(movieEntity.getId())
                                                   .title(movieEntity.getTitle())
                                                   .director(movieEntity.getDirector())
                                                   .genre(movieEntity.getGenre())
                                                   .rating(movieEntity.getRating())
                                                   .year(movieEntity.getYear())
                                                   .build())
                          .collect(Collectors.toList());

        final Movies movies = Movies.builder()
                                    .items(movieList)
                                    .total((long) movieList.size())
                                    .build();

        return Response.ok().entity(movies).build();
    }

    @Override
    public Response bulkCreate(final List<CreateMovie> movies) {
        return null;
    }

    @Override
    public Response bulkUpdate(final List<UpdateMovie> movies) {
        return null;
    }

    @Override
    public Response bulkDelete(final List<String> ids) {
        return null;
    }
}
