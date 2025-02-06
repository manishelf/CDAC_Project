package com.parkngo.service;

import java.time.Duration;
import java.time.Instant;

import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.boot.context.event.ApplicationStartedEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

import lombok.extern.slf4j.Slf4j;

@Component
@Slf4j
public class UptimeService {
	private Instant startTime;

    @EventListener
    public void onApplicationStarted(ApplicationStartedEvent event) {
        startTime = Instant.now();
    }

    @EventListener
    public void onApplicationReady(ApplicationReadyEvent event) {
        Instant readyTime = Instant.now();
        Duration uptime = Duration.between(startTime, readyTime);
    }

    public Duration getUptime() {
        return Duration.between(startTime, Instant.now());
    }
}
