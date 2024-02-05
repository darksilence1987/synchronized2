package org.xhite.synchronized2.service;

import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class SessionService {
    private final Map<String, Long> activeSessions = new ConcurrentHashMap<>();

    public void createSession(String sessionId, Long userId) {
        activeSessions.put(sessionId, userId);
    }

    public Long getUserIdBySessionId(String sessionId) {
        return activeSessions.get(sessionId);
    }

    public void removeSession(String sessionId) {
        activeSessions.remove(sessionId);
    }
}
