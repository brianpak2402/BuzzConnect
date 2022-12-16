package com.team56.BuzzConnect.domain.user;

import javax.persistence.*;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.team56.BuzzConnect.domain.event.*;

@Entity
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@AttributeOverrides({
    @AttributeOverride(name = "id", column = @Column(name = "host_id"))
})
public class Host extends User {

    @OneToMany(mappedBy = "host", fetch = FetchType.LAZY, cascade = {CascadeType.PERSIST, CascadeType.REFRESH })
    private Set<Event> events;

    // Constructor
    public Host() {
        super();
    }

    public Host(String username, String password) {
        super(username, password);
    }

    public void removeEvent(Event event) {
        this.events.remove(event);
    }

}