package uz.pdp.websocket_example;

import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.Random;

@Component
@RequiredArgsConstructor
public class TestComponent {
    private final SimpMessagingTemplate messagingTemplate;
//    @Scheduled(fixedRate = 5000L)
    private void sendMessageToTopic(){
        Random random = new Random();
        int[] numbers = random.ints(10, 10, 100).toArray();
        messagingTemplate.convertAndSend("/chat/numbers",numbers);
    }
}
