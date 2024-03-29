package project.forAll.form;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import project.forAll.domain.member.Member;

import java.time.LocalDateTime;
import java.util.List;

@Getter @Setter
@NoArgsConstructor
public class ArticleForm {
    // id
    private Long id;
    // 제목
    private String title;
    // 내용
    private String content;
     // 생성일시 (수정일시)
     private String writtenAt;
    // 카테고리
    private String category;
    // 생성자
    private String userId;
    // 첨부사진
    private List<String> postImage;
    // 댓글
    private List<CommentForm> comments;
    // 좋아요 수
    private int recommend;
    // 좋아요 가능 여부
    private Boolean recommendAble;
}