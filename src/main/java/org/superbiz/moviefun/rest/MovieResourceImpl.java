package org.superbiz.moviefun.rest;

import org.superbiz.model.CreateMovie;
import org.superbiz.model.Movie;
import org.superbiz.model.UpdateMovie;
import org.superbiz.model.rest.MovieResource;
import org.superbiz.moviefun.MovieEntity;
import org.superbiz.moviefun.MoviesBean;

import javax.ejb.EJB;
import javax.enterprise.context.ApplicationScoped;
import javax.ws.rs.core.Response;

@ApplicationScoped
public class MovieResourceImpl implements MovieResource {
    @EJB
    private MoviesBean service;

    @Override
    public Response create(final CreateMovie movie) {
        final MovieEntity movieEntity = new MovieEntity(
                movie.getTitle(), movie.getDirector(), movie.getGenre(), movie.getRating(), movie.getYear());
        service.addMovie(movieEntity);

        final Movie readMovie = Movie.builder()
                                     .id(movieEntity.getId())
                                     .title(movieEntity.getTitle())
                                     .director(movieEntity.getDirector())
                                     .genre(movieEntity.getGenre())
                                     .rating(movieEntity.getRating())
                                     .year(movieEntity.getYear())
                                     .build();

        return Response.ok().entity(readMovie).build();
    }

    @Override
    public Response update(final String id, final UpdateMovie movie) {
        return null;
    }

    @Override
    public Response read(final String id) {
        final MovieEntity movieEntity = service.find(id);

        final Movie readMovie = Movie.builder()
                                     .id(movieEntity.getId())
                                     .title(movieEntity.getTitle())
                                     .director(movieEntity.getDirector())
                                     .genre(movieEntity.getGenre())
                                     .rating(movieEntity.getRating())
                                     .year(movieEntity.getYear())
                                     .build();

        return Response.ok().entity(readMovie).build();
    }

    @Override
    public void delete(final String id) {
        service.deleteMovie(id);
    }
}
