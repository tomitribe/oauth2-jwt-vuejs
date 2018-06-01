package org.superbiz.model;

import org.tomitribe.api.Model;
import org.tomitribe.api.Resource;

@Resource
class MovieModel {
    @Model(id = true, operation = Model.Operation.READ)
    private String id;
    private String director;
    private String title;
    private int year;
    private String genre;
    private int rating;
}
