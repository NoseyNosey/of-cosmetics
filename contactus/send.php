<?php
mb_language("Japanese");
mb_internal_encoding("UTF-8");

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  exit;
}

// 受け取り
$email    = trim($_POST['email'] ?? '');
$name     = trim($_POST['name'] ?? '');
$tel      = trim($_POST['tel'] ?? '');
$category = trim($_POST['category'] ?? '');
$message  = trim($_POST['message'] ?? '');

// 簡易バリデーション
if ($email === '' || $name === '' || $category === '' || $message === '') {
  exit('入力内容に不備があります');
}

// 管理者向けメール
$admin_to = 'info@of-cosmetics.com';
$subject  = '【OF】お問い合わせが届きました';

$body = <<<EOT
お問い合わせがありました。

■ お名前
{$name}

■ メールアドレス
{$email}

■ 電話番号
{$tel}

■ お問い合わせの種類
{$category}

■ お問い合わせ内容
{$message}
EOT;

$headers = "From: info@of-cosmetics.com";

mb_send_mail($admin_to, $subject, $body, $headers);

// 自動返信
$reply_subject = '【OF】お問い合わせありがとうございます';
$reply_body = <<<EOT
{$name} 様

この度はお問い合わせいただきありがとうございます。
内容を確認のうえ、担当者よりご連絡いたします。

――――――――――
お問い合わせ内容
――――――――――
{$message}

※本メールは自動送信です。
EOT;

mb_send_mail($email, $reply_subject, $reply_body, $headers);

// 完了画面へ
header('Location: etc.html');
exit;
